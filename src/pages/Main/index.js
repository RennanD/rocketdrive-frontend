import React , {Component} from 'react'

import api from '../../services/api'

import './styles.css'
import logo from '../../assets/logo.svg'

export default class Main extends Component{

	state = {
		newBox: ''
	}

	createBox =  async (e) => {

		e.preventDefault()

		const response = await api.post('boxes', {
			title: this.state.newBox
		})

		this.props.history.push(`/box/${response.data._id}`)
	}

	inputChange = (e) => {
		this.setState({ newBox: e.target.value})
	}

	render() {
	  return (
	    <div id = 'main-container'>

	    	<form onSubmit = {this.createBox}>
	    		<img src = {logo} alt = '' />

	    		<input placeholder = 'Criar uma pasta' 
	    			value ={this.state.newBox}
	    			onChange = {this.inputChange}/>

	    		<button type = 'submit'> Criar </button>
	    	</form>

	    </div>
	  );
	}
	
}