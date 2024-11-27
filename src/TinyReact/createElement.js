export default function createElement(type,props,...children) {
	/*   1.需要对每个children做判断是否为文本节点，文本节点默认返回是['文本内容']，也要改为{type,props,children}格式   */
	/*
	const childElements = [].concat(children).map(child=>{
		if(child instanceof Object){ // 不是文本节点直接返回
			return child
		}else{ // 如果是文本节点也需要{type,props,children}格式
			return createElement('text',{textContent:child})
		}
	})
	 */

	/*    2.当有节点为布尔值或null时则不用返回，所以就不能用map改为reduce  */
	const childElements = [].concat(...children).reduce((result,child)=>{
		if(child !== false && child !== true && child !== null){
			if(child instanceof Object){ // 不是文本节点直接返回
				result.push(child)
			}else{ // 如果是文本节点也需要{type,props,children}格式
				result.push(createElement('text',{textContent:child}))
			}
		}
		return result

	},[])
	/*    3. 当我们可以通过props.children拿到组件中的子节点，所以在props还要加个children属性 */
	return{
		type,
		props:Object.assign({children:childElements},props),
		children:childElements
	}

}


