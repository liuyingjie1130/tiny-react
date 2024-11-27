import createDOMElement from './createDOMElement'
import unmountNode from "./unmountNode";

export default function mountNativeElement(virtualDOM,container,oldDOM) {
	let newElement = createDOMElement(virtualDOM);
	// 将转换之后的DOM对象放置在页面中
	if (oldDOM) {
		container.insertBefore(newElement, oldDOM)
	} else {
		container.appendChild(newElement)
	}
// 判断旧的DOM对象是否存在 存在则删除
	if(oldDOM){
		unmountNode(oldDOM)
	}
	// 将转换后的DOM对象放在页面中
	container.appendChild(newElement)

	let component =  virtualDOM.component//实例化对象  实例化对象上才有setDOM方法
	if(component){
		component.setDOM(newElement)
	}
}
