import React from 'react'
export const createForm = () => (Comp) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.options = {}
        }
        getFieldDecorator = (field, option) => Cmp => {
            this.options[field] = option
            return React.cloneElement(Cmp, {
                value: this.state[field],
                onChange: event => this.setState({[field]: event.target.value})
            })
        }
        setFieldsValue = newState => {
            this.setState(newState)
        }
        validateFields = cb => {
            let err = []
            Object.keys(this.options).forEach(key => {
                const { rules } = this.options[key]
                const rule = rules[0]
                if (rule && rule.required && !this.state[key]) {
                    err.push({
                        name: key,
                        value: this.state[key],
                        message: rule.message
                    })
                }
            })
            if (err.length > 0) {
                console.warn(err)
            }
            cb && cb(err.length > 0 ? err : null, this.state)
        }
        getFieldValue = name => {
            return this.state[name]
        }
        getFieldsValue = () => {
            return this.state
        }
        getForm = () => {
            return {
                form: {
                    getFieldDecorator: this.getFieldDecorator,
                    setFieldsValue: this.setFieldsValue,
                    validateFields: this.validateFields,
                    getFieldValue: this.getFieldValue,
                    getFieldsValue: this.getFieldsValue
                }
            }
        }
        render() {
            return <Comp {...this.props} {...this.getForm()}/>
        }
    }
}