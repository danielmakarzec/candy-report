class Api::V1::ReviewsController < ApplicationController
    # protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token

    def create
        review = Review.new(review_params)

        if review.save
            render json: ReviewSerializer.new(review).serialized_json
        else
            render json: { error: review.errors.messages }, status: 442
        end
    end

    def destroy
        review = Review.find(params[:id])

        if review.destroy
            head :no_content
        else
            render json: { error: review.errors.messages }, status: 442
        end
    end

    private

    def review_params
        params.require(:review).permit(:title, :description, :score, :candy_id)
    end
end