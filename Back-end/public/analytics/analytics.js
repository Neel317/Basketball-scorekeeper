import {Kratos} from "./kratos.js"

const courseSidebar = document.querySelector('#course-left-sidebar')
const courseContent = document.querySelector('#course-content')

// Initialize unique user hash
const options = {
  dataFrequency: 10000
}
const kratos = new Kratos(options)
// kratos.print()
// setTimeout(() => kratos.sendData(), options.dataFrequency)
kratos.listenerAndFindOnce('mouseover', courseSidebar, ['courseDetails', 'enrollButton'])
kratos.listenerAndFindOnce('mouseover', courseContent, ['courseDescription', 'courseTable', 'review'])