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
}

module.exports = GameHelper