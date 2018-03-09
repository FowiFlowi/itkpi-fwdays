const R = require('rambda')
const rozklad = require('node-rozklad-api');

(async () => {
  const eachWithIndex = R.addIndex(R.forEach)

  const isGoodTeacher = teacher => Number(teacher.teacher_rating) === 5
  const getTeacherName = teacher => teacher.teacher_name
  const addSpring = str => str + ' 💐'
  const congratulations = teacherName => `С праздником весны, ${teacherName}!`
  const timeoutCongrats = (congrats, indx) => 
    setTimeout(console.log, indx * 1000, congrats)

  R.compose(
    eachWithIndex(timeoutCongrats),
    R.map(addSpring),
    R.map(congratulations),
    R.map(getTeacherName),
    R.filter(isGoodTeacher)
  )(await getAllTeachers())
})()

async function getAllTeachers(offset = 0, result = []) {
  const response = await rozklad.teachers({ filter: { offset } })

  return response.data
    ? getAllTeachers(offset + 100, result.concat(response.data))
    : result
}
