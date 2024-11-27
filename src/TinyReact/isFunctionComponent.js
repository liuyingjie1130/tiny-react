export default function isFunctionComponent(virtualDOM) {
	const type = virtualDOM.type
	return !(type.prototype && type.prototype.render)  //判断有没有render方法，有就是类组件
}
