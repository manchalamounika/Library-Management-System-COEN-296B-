import React,{Component} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

class MyTrComponent extends React.Component {
	constructor () {
		super()
		this.state = {
			background: null
		}
	}
	render () {
		const {children, className, style, ...rest} = this.props
		console.log(rest)
		return (
			<div
				className={'rt-tr ' + className}
				style={{
					...style,
					...this.state
				}}
                {...rest}
                
				onMouseEnter={() => console.log(children)}
				onMouseLeave={() => this.setState({
					background: null
				})}
			>
				{children}
			</div>
		)
	}
}

export default MyTrComponent;