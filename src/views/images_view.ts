import Image from "../models/Image";


// VIEW importante para a resposta ao cliente, isso filtra o que vai de res para a chamada e para o usuario
export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://localhost:3333/uploads/${image.path}` 
        
        };
    },



renderMany(image: Image[]) {
    return image.map(image => this.render(image));
}
};