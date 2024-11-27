export default function unmountNode(node) {
	const virtualDOM = node._virtualDOM;
	// 1.文本可以直接删除
	if(virtualDOM.type === 'text'){
		node.remove()
		return
	}

	// 2.看下节点是否由组件生成的
	let compnent = virtualDOM.component
	// 如果component存在就说明节点是有组件生成的
	if(compnent){
		compnent.componentWillUnmount()
	}

	// 3.看下节点身上是否有ref属性
	if(virtualDOM.props && virtualDOM.props.ref){
		virtualDOM.props.ref(null)
	}

	// 4.看下节点的属性中是否有事件属性
	Object.keys(virtualDOM.props).forEach(propName=>{
		if(propName.slice(0,2) === 'on'){
			const eventName = propName.toLocaleLowerCase().slice(0,2)
			const eventHandle = virtualDOM.props[eventName]
			node.removeEventListener(eventName,eventHandle)
		}
	})

	// 5.递归删除子节点
	if(node.childNodes.length > 0){
		for(let i =0;i<node.childNodes.length;i++){
			unmountNode(node.childNodes[i])
			i--;
		}
	}
	node.remove()
}
