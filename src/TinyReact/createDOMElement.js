import mountElement from "./mountElement";
import updateNodeElement from './updateNodeElement';

export default function createDOMElement(virtualDOM) {
	let newElement = null;
	if(virtualDOM.type === 'text'){//文本节点
		newElement = document.createTextNode(virtualDOM.props.textContent)
	}else{//元素节点
		newElement = document.createElement(virtualDOM.type)

		//添加属性
		updateNodeElement(newElement,virtualDOM)
	}

	newElement._virtualDOM = virtualDOM;//为了以后和新virtualDOM作比较

	// 递归创建子节点
	virtualDOM.children.forEach(child=>{
		mountElement(child,newElement)
	})

	if(virtualDOM.props && virtualDOM.props.ref){
		virtualDOM.props.ref(newElement)
	}

	return newElement
}

