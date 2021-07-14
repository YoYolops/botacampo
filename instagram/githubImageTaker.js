// Esse arquivo serve unicamente para pegar imagens do github e inseri-los na página,
// evitando de ter que pegar imagem por imagem na mão

// lista com os nicks do github cujas url de imagens de perfil serão coletadas
const githubUserNames = [
    "YoYolops", "fernandollisboa", "Eduarda-Donato",
    "ielepassos", "lesimoes", "natalia-sa",
    "pedroeoa", "rla4", "ummatias", "soaresmaric",
    "andriellyll", "leleoveiga", "hadrizia", "gabrielhdof"
]

const baseUrl = "https://api.github.com/users/"

/**
 * Função que coleta url de imagem de perfil do github
 * 
 * @example getImageUrl("YoYolops") // "https://avatars.githubusercontent.com/u/66336628?v=4"
 * 
 * @param {String} nickname nickname do usuário que terá imagem coletada
 * @returns {String} String source da imagem
 */
async function getImageUrl(nickName) {
    const userUrl = baseUrl + nickName
    const imageUrl = await fetch(userUrl).then(Response => Response.json()).then(obj => obj["avatar_url"])
    return imageUrl
}

/**
 * Função que cria tags <img /> dinamicamente
 * 
 * @param {Array} nicksList Lista com nomes de usuários
 * @param {String} parentId identificador da tag que será pai das <img />
 * @returns {void}
 */
async function imgTagCreator(nicksList, parentClassName) {
    let imgsParent = document.getElementsByClassName(parentClassName);

    for(let i = 0; i < imgsParent.length; i++) {
        const srcAttribute = await getImageUrl(nicksList[i])

        let newImage = document.createElement("img")
        newImage.src = srcAttribute

        imgsParent[i].insertBefore(newImage, imgsParent[i].children[2])
    }
}

imgTagCreator(githubUserNames, "images")