import axios from 'axios';

async function fetch(id: string) {
  return new Promise(resolve => {
    axios.get(`//localhost:5000/api/workflows/${id}`)
          .then(({data: {workflow}}) => resolve(workflow))
  })
}

export default fetch
