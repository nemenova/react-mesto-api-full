class Api {
    constructor(options) {
        this._address = options.baseUrl;
        this._token = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status}`);
    }
    getCards() {
        return fetch(`${this._address}/cards`, {
            credentials: 'include',
        })
            .then(this._checkResponse) 
    }
    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            credentials: 'include',
        
        })
            .then(this._checkResponse)
    }
    changeUserInfo(user) {
        return fetch(`${this._address}/users/me`,  {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user.name,
                about: user.about
            })
                
        }).then(this._checkResponse)
    }
    addNewCard(card) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })

        }).then(this._checkResponse)
    }
    changeProfilePhoto(data) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })

        }).then(this._checkResponse)
    }
    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            
        }).then(this._checkResponse)
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
            credentials: 'include',

        }).then(this._checkResponse)
    }
}
const api = new Api({
    baseUrl: 'https://nemenova.nomoredomains.rocks',
})
export default api;