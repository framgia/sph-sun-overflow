const errorMessages = (usage?: string): string => {
    switch (usage) {
        case 'answer-empty':
            return 'Answer must not be empty!'
        case 'answer-not-update':
            return 'Answer Not Updated!'
        case 'comment-empty':
            return 'Comment must not be empty!'
        case 'no-change':
            return 'No changes were made'
        default:
            return 'There was an Error!'
    }
}

export default errorMessages
