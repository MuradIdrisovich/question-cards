
export function decode(str){
    let textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value
}

// const [input, setInput] = useState('hello');
// const [output, setOutput] = useState('');
// const translate = () => {
//   const params = new URLSearchParams();
//   params.append("q", ['help', 'house'] );
//   params.append("source", "en");
//   params.append("target", "ru");
//   params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
//   axios.post('https://libretranslate.de/translate', params, {
//       headers: {
//           "accept": "application/json",
//           "Content-Type": "application/x-www-form-urlencoded"
//       }
//   }).then(res => {
//       // console.log(res.data.translatedText)
//   })
// }
// useEffect(() => {
//     translate();
// },[])