import diff from './diff.js'
export default  function render(virtualDOM,container,oldDOM = container.firstChild) {
	diff(virtualDOM,container,oldDOM)
}
