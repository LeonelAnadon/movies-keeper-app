export const formatDate = (date) => {
  const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  const theDate = new Date(date)
  
  let formatted_date = `${theDate.getDate() <= 9 ? `0${theDate.getDate()}` : theDate.getDate()}-${months[theDate.getMonth()]}-${theDate.getFullYear()}`
  
  let timeLocale = theDate.toLocaleTimeString()
  
	return `${formatted_date} — ${timeLocale}`
}

export const formatDateWithoutTime = (date) => {
  const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  const theDate = new Date(date)
  
  let formatted_date = `${theDate.getDate() <= 9 ? `0${theDate.getDate()}` : theDate.getDate()}-${months[theDate.getMonth()]}-${theDate.getFullYear()}`
  
  let timeLocale = theDate.toLocaleTimeString()
  
	return `${formatted_date}`
}