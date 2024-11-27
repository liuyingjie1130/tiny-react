import mountElement from './mountElement'
import updateTextNode from "./updateTextNode";
import updateNodeElement from "./updateNodeElement";
import createDOMElement from "./createDOMElement";
import unmountNode from "./unmountNode";
import diffComponent from "./diffComponent";
export default function diff(virtualDOM,container,oldDOM) {
	// Component vs
	// 判断oldDOM存在否，不存在就直接创建；存在就去对比
	const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
	const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
	if(!oldDOM){
		mountElement(virtualDOM,container);
	}else if( virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function'){//类型不同 直接替换元素
		const newElement = createDOMElement(virtualDOM);
		oldDOM.parentNode.replaceChild(newElement,oldDOM)
	}else if(typeof virtualDOM.type === 'function'){
		diffComponent(virtualDOM,oldComponent,oldDOM,container)
	}else if(oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type){
		if(virtualDOM.type === 'text'){//更新内容
			updateTextNode(virtualDOM,oldVirtualDOM,oldDOM)
		}else{
			//更新元素属性
			updateNodeElement(oldDOM,virtualDOM,oldVirtualDOM)
		}


		// 1.将拥有key属性的子元素放置在一个单独的对象中
		let keyedElements ={}
		for(let i = 0 ,len = oldDOM.childNodes.length;i++;){
			let domElement = oldDOM.childNodes[i]
			if(domElement.nodeType === 1){
				let key = domElement.getAttribute('key')
				if(key){
					keyedElements[key] = domElement
				}
			}
		}


		let hasNoKey = Object.keys(keyedElements).length === 0
		if(hasNoKey){
			// 对比子节点
			virtualDOM.children.forEach((child,index)=>{
				diff(child,oldDOM,oldDOM.childNodes[index])
			})
		}else{
			// 2.循环virtualDOM的子元素 获取子元素的key属性
			virtualDOM.children.forEach((child,i)=>{
				let key = child.props.key
				if(key){
					let domElement =  keyedElements[key]
					if(domElement){
						// 3.看看是否是期望的位置
						if(oldDOM.childNodes[i] && oldDOM.childNodes[i]!==domElement){
							oldDOM.insertBefore(domElement,oldDOM.childNodes[i])
						}
					}else{
						// 新增元素
						mountElement(child,oldDOM,oldDOM.childNodes[i])
					}
				}
			})

		}

		//	删除节点
		let oldChildNodes = oldDOM.childNodes;
		if(oldChildNodes.length > virtualDOM.children.length){
		//	有节点需要被删除
			if(hasNoKey){
				for (let i = oldChildNodes.length-1;i>virtualDOM.children.length-1;i--){
					unmountNode(oldChildNodes[i])
				}
			}else{
				// 通过key属性删除节点
				for (let i = 0; i < oldChildNodes.length; i++) {
					let oldChilid = oldChildNodes[i];
					let oldChildKey = oldChilid._virtualDOM.propes.key
					let found = false
					for(let n =0;n<virtualDOM.children.length;n++){
						if(oldChildKey === virtualDOM.children[n].props.key){
							found = true;
							break
						}
					}
					if(!found){
						unmountNode(oldChilid)
					}
				}
			}


		}
	}

}
