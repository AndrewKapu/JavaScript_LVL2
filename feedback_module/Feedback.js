'use strict';

/**
 * @class
 * @constructor
 * Class of feedback
 */
class Feedback {
    /**
     * Creates Feedback instance
     * @param {string} source URL request for user's reviews from server
     */
    constructor(source) {
        /** URL request for users feedback from server
         * @property
         * @public
         * @type {string}
         */
        this.source = source;
        this._init();
    }

    /**
     * Initializes this instance
     */
    _init() {
        fetch(this.source)
            .then(result => result.json())
            .then(reviews => {
                this._renderFeedback(reviews)
            });
        this._initEventHandlers();
    }

    /**
     * Initializes event handlers
     */
    _initEventHandlers() {
        $('.review-form').on('click', '#formSubmit', () => {
            event.preventDefault();
            this._addReview();
        })
    }

    /**
     * Renders feedback from server in user's interface
     * @param {{id: number, name: string, reviewText: string}[]} reviews Array of reviews from user's
     */
    _renderFeedback(reviews) {
        reviews.forEach((review) => {
            this._renderReview(review);
        });
    }

    /**
     * Renders single review in user's interface
     * @param {{id: number, name: string, reviewText: string}} review - Review DTO object
     * @param {boolean} isCurrent - Is processed review added by user at the moment
     */
    _renderReview(review, isCurrent = false) {
        let $singleReview = $('<article/>', {
            'data-user_id': review.id,
            class: 'reviews__users-review',
        });

        let $userName = $('<div/>', {
            class: 'reviews__users-review-name',
            text: review.name
        });

        let $userText = $('<p/>', {
            class: 'reviews__users-review-text',
            text: review.reviewText
        });


        $userName.appendTo($singleReview);
        $userText.appendTo($singleReview);
        if (isCurrent) {
            let $delBtn = $('<a/>', {
                'data-user_id': review.id, 
                class: 'reviews__users-review-delbtn',
                href: '#',
                text: `Удалить Ваш отзыв, ${review.name}`,
            });
            $delBtn.appendTo($singleReview);
        }
        $('#reviewsWrapper').append($singleReview);
    }

    /**
     * Adds review by user's inputed data
     */
    _addReview() {
        //TODO: Finish method                
        let review = {};
        review['id'] = Math.floor(Math.random() * 100);
        review['name'] = $('#name').val();
        review['reviewText'] = $('#reviewText').val();
        this._renderReview(review, true);
    }
}