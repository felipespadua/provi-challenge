const axios = require('axios')

exports.isValidCPF = function (value){
  value = value.replace(/[^\d]+/g,'');	
	if(value == '') return false;	
	if (value.length != 11 || 
		value == "00000000000" || 
		value == "11111111111" || 
		value == "22222222222" || 
		value == "33333333333" || 
		value == "44444444444" || 
		value == "55555555555" || 
		value == "66666666666" || 
		value == "77777777777" || 
		value == "88888888888" || 
		value == "99999999999")
			return false;		
  add = 0;	
  console.log(value)
	for (i=0; i < 9; i ++)		
		add += parseInt(value.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(value.charAt(9)))		
			return false;		
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(value.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(value.charAt(10)))
		return false;		
	return true;   
}

exports.isValidDate = function isValidDate(value) {
  if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
  const date = new Date(value);
  if (!date.getTime()) return false;
  return date.toISOString().slice(0, 10) === value;
}

exports.isValidAddress = async function (value){
  const { cep, street, state, city } = value
  try {
    let response = await axios.get(`http://viacep.com.br/ws/${cep}/json/`)
    let { data } = response
    if(street === data.logradouro && state === data.uf && city === data.localidade){
      return true
    }
   return false

  }catch(err){
    console.log(err)
    return false
  }
 
 
}
