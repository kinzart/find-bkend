import OrphanagesController from "../controllers/OrphanagesController";
import Orphanage from "../models/Orphanage";
import imagesView from  "./images_view"

// VIEW importante para a resposta ao cliente, isso filtra o que vai de res para a chamada e para o usuario
export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderMany(orphanage.images)
        };
    },



renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage));
}
};