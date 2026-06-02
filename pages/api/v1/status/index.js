export default function status(request, response) {
  response.status(200)
  response.json({chave: 'top de mais essa api!'})
}