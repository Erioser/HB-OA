
import React, { Component } from 'react'
import './index.scss'
import { Table, Button, Divider, Icon, Select, Modal, Input } from 'antd';
import connect from '../../modules/connect'
const Option = Select.Option;
const { TextArea } = Input;


class Board extends Component {
    constructor(props) {
        super(props)
        this.searchChange = this.searchChange.bind(this)
        this.checkDetail = this.checkDetail.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.createBoard = this.createBoard.bind(this)
        this.submitCreateBoard = this.submitCreateBoard.bind(this)
    }
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    data: [],
    check_data: {},//准备显示的数据
    types: [],
    modal_visible: false,
    columns : [{
        title: 'Title',
        dataIndex: 'title',
      }, {
        title: 'Content',
        dataIndex: 'content',
      }, {
        title: 'Type',
        dataIndex: 'type',
      },{
        title: 'Action',
        key: 'action',
        render: (text, record) => {
            return (        
                <span>
                  <a href="javascript:;">修改</a>
                  <Divider type="vertical" />
                  <a onClick = { this.deleteBoard.bind(this, record.id) } href="javascript:;">删除</a>
                  <Divider type="vertical" />
                  <a onClick = { this.checkDetail.bind(this, record.id) } href="javascript:;" className="ant-dropdown-link">
                   查看
                  </a>
                </span>
              )
        },
      }]
  };

  getData (type_id = 0) {//获取数据
      this.$http.ajax({
          url: 'api/board-'+type_id+'.json'
      }).then (data => {
          this.setState({data: data.boardlist.map(item => {
              item.key = item.id;
              return item
          })})
      })
  }

  getTypes () {//获取分类
    this.$http.ajax({
        url: 'api/board-types.json'
    }).then (data => {
        this.setState({types: data.boardtypes})
    })
  }

  componentDidMount () {
      this.getData()
      this.getTypes()
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  searchChange (value) {//类型切换选择框
    this.getData(value)
  }
  toggleModal () { //控制弹出框出现
      this.setState({ modal_visible: !this.state.modal_visible })
  }
  checkDetail (id) {//查看详情
    //再去获取更详细的数据
    for (let i = 0; i < this.state.data.length; i++) {
        const item = this.state.data[i];
        if ( item.id === id ) {
            this.setState({ check_data: item });
            break;
        }
    }
    this.toggleModal()
  }

  checkPermisson (type) {
    let { permission } = this.props.commons.user_state 
    return permission.some(item => item === type)
  }

  deleteBoard (id) {//删除数据
    let can = this.checkPermisson('control_board')
    if ( !can ) {
        alert('没有权限');return false;
    }
    //在这里调用后端的接口去更改数据库里的数据，然后记得把前端的数据模型给同步了

    this.setState({ data: this.state.data.filter(item => item.id !== id) })
  }

  createBoard () {//新增公告
    let can = this.checkPermisson('create_board') 
    if ( !can ) {
      alert('没有权限');return false;
    }
    this.setState({ check_data: {} })
    this.toggleModal()//打开面板
  }

  submitCreateBoard (title, content) { //提交新增公告
    //与后端进行数据交互，然后再去。。。
    let id = this.state.data.length + 1
    let board = { title, content, type: '生活园地', type_id: 1, id, key: id }
    this.state.data.push(board)
    this.setState({ data: this.state.data })
    this.toggleModal()
  }

  render() {
    const { loading, selectedRowKeys, data, types, columns, modal_visible, check_data } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className="app-board">
        <div style={{ marginBottom: 16 }}>
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a type"
            onChange = { this.searchChange }
        >
            <Option key = {0} value={0}>全部</Option>
            { types.map(type => (<Option key = {type.id} value={type.id}>{type.title}</Option>)) }
        </Select>,
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <Button
            type="primary"
            onClick={this.createBoard}
          >
            create
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination = {false} />
        
        <OAModal
          checkdata={check_data}
          visible={this.state.modal_visible}
          onOk = { check_data.title ? this.toggleModal : this.submitCreateBoard }
          onCancel = { this.toggleModal }
        >
        </OAModal>
      
      </div>
    );
  }
}


const CreateForm = ({get_content, get_title}) => {
  return (
    <div>
      <Input onChange = {get_title} placeholder="please enter your title" />
      <TextArea onChange = {get_content} placeholder="please enter your content" autosize={{ minRows: 3 }} />
    </div>
  )
}


class OAModal extends Component {
  state = {
    board: {title: '', content: ''}
  }
  constructor ( props) {
    super(props)
    this.get_title = this.get_title.bind(this)
    this.get_content = this.get_content.bind(this)
  }
  get_title  (e) { 
   this.state.board.title = e.target.value;
    this.setState({board : this.state.board})
  }
  get_content  (e) { 
    this.state.board.content = e.target.value;
    this.setState({board : this.state.board})
  }
  render () {
    let title = this.props.checkdata.title || '新增'
    let _content = this.props.checkdata.content || <CreateForm  get_content = {this.get_content} get_title = {this.get_title}/>
   
    return <Modal
      title={ title }
      visible={this.props.visible}
      onOk = { this.props.onOk.bind(null, this.state.board.title, this.state.board.content) }
      onCancel = { this.props.onCancel }
    >
      <div>{_content} --- {this.state.board.title}</div>
    </Modal>
  }
}




export default connect(Board, 'commons')


