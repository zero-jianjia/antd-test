import React, {Component} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Card, Divider, Table, Tag} from 'antd';
import {connect} from 'dva';
import {ConnectState} from "@/models/connect";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
        {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
                color = 'volcano';
            }
            return (
                <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                </Tag>
            );
        })}
      </span>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical"/>
        <a>Delete</a>
      </span>
        ),
    },
];

// eslint-disable-next-line react/prefer-stateless-function
// @connect((state) => {
//     // 数据绑定到 this.props
//     return {
//         data: state[namespace].list
//     };
// }, (dispatch) => {
//     // 函数绑定到 this.props
//     return {
//         initData: () => {
//             dispatch({
//                 type: namespace + "/initData"
//             });
//         }
//     };
// })
// @connect块 一定要紧接着 Component块 ！！！
class Index extends Component {

    componentDidMount() {
        this.props.initData();
    }

    render() {
        return (
            <PageHeaderWrapper>
                <Card>
                    <Table columns={columns} dataSource={this.props.data}/>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

// export default Index;

export default connect(({demo}) => ({
    // 数据绑定到 this.props
    data: demo.list
}), (dispatch) => {
    // 函数绑定到 this.props
    return {
        initData: () => {
            dispatch({
                type: "demo/initData"
            });
        }
    };
})(Index);

