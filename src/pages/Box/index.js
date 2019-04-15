import React , {Component} from 'react'

import api from '../../services/api'
import {distanceInWords} from 'date-fns'
import pt from 'date-fns/locale/pt'
import Dropzone from 'react-dropzone'
import socket from 'socket.io-client'

import './styles.css'
import logo from '../../assets/logo.svg'
import {MdInsertDriveFile} from 'react-icons/md'


export default class Box extends Component{

	state = {
		box: {}
	}

	async componentDidMount(){

		this.subscribeToNewFiles()

		const box_id = this.props.match.params.id
		
		const response = await api.get(`/boxes/${box_id}`)

		this.setState({box: response.data})
	} 

	subscribeToNewFiles = () =>{
		const box = this.props.match.params.id
		const io = socket('https://rocketdrive-back.herokuapp.com/')

		io.emit('connectRoom',box)

		io.on('file', data =>{
			this.setState({box: {...this.state.box, files: [data, ...this.state.box.files]}})
		})
	}

	handleUpload = (files) => {
		files.forEach(file =>{
			const data = new FormData()
			const box_id = this.props.match.params.id
			
			data.append('file', file)

			api.post(`/boxes/${box_id}/files`, data)
		})
	}


	render() {
	  return (
	    <div id = 'box-container'>
	    	<header>
	    		<img src = {logo} alt = '' />
	    		<h1>{this.state.box.title}</h1>
	    	</header>

	    	<Dropzone onDropAccepted = {this.handleUpload}>
	    		{({getRootProps, getInputProps}) => (
	    			<div className = 'upload' {...getRootProps()}>
	    				<input {...getInputProps()}/>
	    				<p> Clique ou arraste arquivos </p>
	    			</div>

	    		)}
	    	</Dropzone>

	    	<ul> 

	    	{this.state.box.files && this.state.box.files.length >0 

	    	?
	    	 this.state.box.files.map( file =>(

	    			<li key = {file._id}>
		    			<a className = 'fileInfo' href = {file.url} target = '_blank'>
		    				<MdInsertDriveFile size = {24} color = '#A5Cfff' />
		    				<strong>{file.title}</strong>
		    			</a>

		    			<span>há {distanceInWords(file.createdAt, new Date(),{
		    				locale:pt
		    			})}</span>
	    			</li>

	    		))
	    	 :
	    	 <p>Ainda não há arquivos nesta pasta...</p>
	    	}
	    		

	    	</ul>
	    </div>
	  );
	}
	
}