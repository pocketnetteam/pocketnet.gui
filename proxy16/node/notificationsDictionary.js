module.exports = (data = {user: "", amount: "", score: ""}) => {
    return {
        boost: {
            ru: {
                title: `Повышение рейтинга Вашего комментария`,
                body: `От пользователя ${data.user}`
            },
            en: {
                title: `Increasing the rating of your comment`,
                body: `By ${data.user}`
            }
        },
        money: {
            ru: {
                title: `Пополнение кошелька`,
                body: `Ваш кошелек пополнен на сумму ${data.amount}`
            },
            en: {
                title: `Incoming transaction`,
                body: `Amount: ${data.amount} PKOIN`
            }
        },
        winPost: {
            ru: {
                title: `Ваша публикация получила выигрыш`,
                body: `Сумма ${data.amount}`
            },
            en: {
                title: `Your post has been rewarded`,
                body: `Amount: ${data.amount}`
            }
        },
        winComment: {
            ru: {
                title: `Ваш комметарий получил выигрыш`,
                body: `Сумма ${data.amount}`
            },
            en: {
                title: `Your comment has been rewarded`,
                body: `Amount: ${data.amount}`
            }
        },
        winCommentref: {
            ru: {
                title: `Комметарий вашего реферала получил выигрыш`,
                body: `Сумма ${data.amount}`
            },
            en: {
                title: `Your referral's comment has been awarded`,
                body: `Сумма ${data.amount}`
            }
        },
        winPostref: {
            ru: {
                title: `Публикация вашего реферала получила выигрыш`,
                body: `Сумма ${data.amount}`
            },
            en: {
                title: `Your referral's post has been awarded`,
                body: `Amount: ${data.amount}`
            }
        },
        comment: {
            ru: {
                title: `Вам оставлен новый комментарий`,
                body: `От пользователя ${data.user}`
            },
            en: {
                title: `You have a new comment`,
                body: `By ${data.user}`
            }
        },
        privatecontent: {
            ru: {
                title: `Новая публикация`,
                body: `От пользователя ${data.user}`
            },
            en: {
                title: `New publication`,
                body: `By ${data.user}`
            }
        },
        commentDonate: {
            ru: {
                title: `Ваш комментарий вознаградил пользователь ${data.user}`,
                body: `Сумма ${data.amount}`
            },
            en: {
                title: `Your comment has been rewarded by ${data.user}`,
                body: `Amount: ${data.amount}`
            }
        },
        answer: {
            ru: {
                title: `Оставлен ответ на Ваш комментарий`,
                body: `От пользователя ${data.user}`
            },
            en: {
                title: `Reply to your comment`,
                body: `By ${data.user}`
            }
        },
        answerDonate: {
            ru: {
                title: `Ваш ответ на комментарий вознаградил пользователь ${data.user}`,
                body: `Сумма ${data.amount}`
            },
            en: {
                title: `Your comment has been rewarded by ${data.user}`,
                body: `Amount: ${data.amount}`
            }
        },
        subscriber: {
            ru: {
                title: `У Вас новый подписчик`,
                body: `Пользователь ${data.user}`
            },
            en: {
                title: `You have a new subscriber`,
                body: `${data.user}`
            }
        },
        contentscore: {
            ru: {
                title: `Пользователь ${data.user} поставил оценку Вашей публикации`,
                body: `Оценка ${data.score}`
            },
            en: {
                title: `${data.user} has rated your post`,
                body: `Rating: ${data.score}`
            }
        },
        commentscore: {
            ru: {
                title: `Пользователь ${data.user} поставил оценку Вашему комментарию`,
                body: `Оценка ${data.score}`
            },
            en: {
                title: `${data.user} has rated your comment`,
                body: `Rating: ${data.score}`
            }
        },
        default: {
            ru: {
                title: `Уведомление!`,
                body: `У вас новое уведомление.`
            },
            en: {
                title: `Notification`,
                body: `You have notification`
            }
        }
    }
}