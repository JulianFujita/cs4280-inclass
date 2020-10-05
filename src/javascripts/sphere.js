export class Sphere {
    constructor(r = 0.9, nPoints = 36) {
        this.vertices = []

        // Latitude
        for(let i = 0; i < nPoints; i++) {
            let theta = i * 2 * Math.PI / nPoints

            // Longitude
            for(let j = 0; j < nPoints; j++) {
                let phi = j * 2 * Math.PI / nPoints
                this.vertices.push(
                    r * Math.cos(phi) * Math.sin(theta),
                    r * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta)
                )
            }
        }
    }
}