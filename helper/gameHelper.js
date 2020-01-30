class GameHelper{
  static dlcToString(value){
    value.map(el=> el.name)
    return value.join('\n')
  }

  static genreToArray(value){
    let str = ''
    for(let i in value){
      if(i!=0 && i!=value.length-1){
        str+=value[i]
      }
    }
    return str.split(',')
  }
  static genreToString(value){
    let arr = value.split(' ')
    arr.push("}")
    arr.unshift("{")
    return arr.join(',')
  }

  static resiGenerator(value){
    let rdm = ['qwJka','Ysasd', 'ksLjh', 'HajPL', 'TrLPs']
    let resi = new Date().getDate()+"-"+rdm[Math.floor(Math.random()*5)]+"-"+value
    return resi
  }

  static getAllDlc(value){
    let dlc = value.map(el=>{el.name})
    return dlc.join(',')
  }
}

module.exports = GameHelper