const screenshot = require('screenshot-desktop');
const axios = require('axios');
var fs = require('fs');
const FormData = require('form-data');
const readline = require('readline');
require('dotenv').config()

const test = (name) => {
let date = Date.now();

screenshot({ filename: `shot-${date}.jpg` }).then((imgPath) => {
	console.log(imgPath)
	let url = process.env.URL;

	// personally I'd function out the inner body here and just call 
	// to the function and pass in the newFile
	//newFile.on('end', function() {
	  const form_data = new FormData();
	  form_data.append('name', name);
	  form_data.append("file", fs.createReadStream(imgPath), "shot-${date}.jpg");
	  const request_config = {
		method: "post",
		url: url,
		headers: {
	//		"Authorization": "Bearer " + access_token,
			"Content-Type": "multipart/form-data"
		},
		data: form_data
	  };
	  axios(request_config).then((res)=>{
		  console.log(res)
	  }).catch((err)=>{
		  console.log(err)
	  });
	  setTimeout(()=>{
		 fs.unlinkSync(imgPath); 
	  }, 500);
	  return;
	//});

	//fs.unlinkSync(imgPath);
});	
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask the user a question
rl.question('What is your name? ', (answer) => {
  console.log(`Hello, ${answer}!`);
  let interval = setInterval(()=>
	test(answer)
  , 1000);
  
  // Close the readline interface after receiving input
  rl.close();
});