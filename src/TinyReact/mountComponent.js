import isFunctionComponent from "./isFunctionComponent";
import isFunction from "./isFunction"
import mountNativeElement from "./mountNativeElement";
export default function mountComponent(virtualDOM,container,oldDOM){
	// 判断是函数组件还是类组件
	let nextVirtualDOM = null
	let component = null
	if(isFunctionComponent(virtualDOM)){
		console.log('函数组件')
		nextVirtualDOM = buildFunctionComponent(virtualDOM)
	}else{
		nextVirtualDOM = buildClassComponent(virtualDOM)
		component = nextVirtualDOM.component;
	}
	// 还要判断下新的是不是组件
	if (isFunction(nextVirtualDOM)) {
		mountComponent(nextVirtualDOM, container, oldDOM)
	} else {
		mountNativeElement(nextVirtualDOM, container, oldDOM)
	}
	if (component) {
		component.componentDidMount()
		if (component.props && component.props.ref) {
			component.props.ref(component)
		}
	}

}

function  buildFunctionComponent(virtualDOM) {
	return virtualDOM.type(virtualDOM.props || {})  //传递props参数
}

function buildClassComponent(virtualDOM){
	const component = new virtualDOM.type(virtualDOM.props || {})  //传递props参数
	const nextVirtualDOM = component.render()
	nextVirtualDOM.component = component //给virtualDOM传递实例化对象
	return nextVirtualDOM
}
