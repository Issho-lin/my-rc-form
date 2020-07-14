import React from 'react'
import { Form, Input, Button } from 'antd';
// import { createForm } from 'rc-form'
import { createForm } from '../my-rc-form'

@createForm()
class RcFormPage extends React.Component {
    componentDidMount() {
        console.log(this.props.form)
        const { setFieldsValue } = this.props.form
        setFieldsValue({username: 'default'})
    }
    handleSubmit = e => {
        e.preventDefault();
        const { getFieldValue, validateFields } = this.props.form
        console.log(getFieldValue('username'));
        validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input placeholder="Username"/>,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input type="password" placeholder="Password"/>,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default RcFormPage