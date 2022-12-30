module.exports = (data = {user: "", amount: "", score: ""}) => {
    return {
        repost : {
            ru: {
                title: `Был сделан репост вашей публикации`,
                body: `Пользователь ${data.user}`
            },
            en: {
                title: `Your post has been reposted`,
                body: `By ${data.user}`
            }
        },
        boost: {
            ru: {
                title: `⚡️Ваш пост был поднят в ленте пользователем ${data.user}`,
                body: `На сумму ${data.amount}`
            },
            en: {
                title: `⚡️Your post have been boosted by ${data.user}`,
                body: `Amount: ${data.amount} PKOIN`
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
                title: `${data.user} оставил Вам новый комментарий`,
                body: ``
            },
            en: {
                title: `You have a new comment by ${data.user}`,
                body: ``
            }
        },
        privatecontent: {
            ru: {
                title: `Новая публикация от ${data.user}`,
                body: ``
            },
            en: {
                title: `New publication by ${data.user}`,
                body: ``
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
                title: `${data.user} оставил ответ на Ваш комментарий`,
                body: ``
            },
            en: {
                title: `Reply to your comment by ${data.user}`,
                body: ``
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
                title: `Пользователь ${data.user} оцененил Вашу публикацию`,
                body: `Оценка ${data.score}`
            },
            en: {
                title: `${data.user} has rated your post`,
                body: `Rating: ${data.score}`
            }
        },
        commentscore: {
            ru: {
                title: `Пользователь ${data.user} оцененил Ваш комментарий`,
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
        },
        referal: {
            ru: {
                title: `У вас новый реферал`,
                body: `Пользователь ${data.user}`
            },
            en: {
                title: `You have a new referral`,
                body: `User ${data.user}`
            }
        },
        images: {
            ru: "Изображения",
            en: "Images"
        }
    }
}