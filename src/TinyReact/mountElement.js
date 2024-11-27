import mountNativeElement from './mountNativeElement'
import isFunction from "./isFunction";
import mountComponent from './mountComponent';
export default function mountElement(virtualDOM,container,oldDOM){
	// 要创建的是普通的元素还是组件

	if(isFunction(virtualDOM)){
		mountComponent(virtualDOM,container,oldDOM)
	}else {
		mountNativeElement(virtualDOM,container,oldDOM)
	}
}
