
function greeting(age,gender) {
  if(age <= 10 ) {
    return 'Kids'
  } else if(age <= 25 && gender == 'male') {
    return 'Ganteng'
  } else if(age <= 25 && gender == 'female') {
    return 'Cantique'
  } else if(age > 25 && gender == 'male') {
    return 'Master'
  } else if(age > 25 && gender == 'female') {
    return 'My Lady'
  }
}

module.exports = greeting