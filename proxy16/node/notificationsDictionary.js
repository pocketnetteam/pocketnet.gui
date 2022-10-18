module.exports = (data = {user: "", amount: "", score: ""}) => {
    return {
        boost: {
            ru: {
                title: `Повышение рейтинга Вашего комментария`,
                body: `От пользователя ${data.user}`
            }
        },
        money: {
            ru: {
                title: `Пополнение кошелька`,
                body: `Ваш кошелек пополнен на сумму ${data.amount}`
            }
        },
        winPost: {
            ru: {
                title: `Ваша публикация получила выигрыш`,
                body: `Сумма ${data.amount}`
            }
        },
        winComment: {
            ru: {
                title: `Ваш комметарий получил выигрыш`,
                body: `Сумма ${data.amount}`
            }
        },
        winCommentref: {
            ru: {
                title: `Комметарий вашего реферала получил выигрыш`,
                body: `Сумма ${data.amount}`
            }
        },
        winPostref: {
            ru: {
                title: `Публикация вашего реферала получила выигрыш`,
                body: `Сумма ${data.amount}`
            }
        },
        comment: {
            ru: {
                title: `Вам оставлен новый комментарий`,
                body: `От пользователя ${data.user}`
            }
        },
        privatecontent: {
            ru: {
                title: `Новая публикация`,
                body: `От пользователя ${data.user}`
            }
        },
        commentDonate: {
            ru: {
                title: `Ваш комментарий вознаградил пользователь ${data.user}`,
                body: `Сумма ${data.amount}`
            }
        },
        answer: {
            ru: {
                title: `Оставлен ответ на Ваш комментарий`,
                body: `От пользователя ${data.user}`
            }
        },
        answerDonate: {
            ru: {
                title: `Ваш ответ на комментарий вознаградил пользователь ${data.user}`,
                body: `Сумма ${data.amount}`
            }
        },
        subscriber: {
            ru: {
                title: `У Вас новый подписчик`,
                body: `Пользователь ${data.user}`
            }
        },
        contentscore: {
            ru: {
                title: `Пользователь ${data.user} поставил оценку Вашей публикации`,
                body: `Оценка ${data.score}`
            }
        },
        commentscore: {
            ru: {
                title: `Пользователь ${data.user} поставил оценку Вашему комментарию`,
                body: `Оценка ${data.score}`
            }
        },
        default: {
            ru: {
                title: `Уведомление!`,
                body: `У вас новое уведомление.`
            }
        }
    }
}