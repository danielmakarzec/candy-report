class Api::V1::CandiesController < ApplicationController
    protect_from_forgery with: :null_session

    def index
        candies = Candy.all

        render json: CandySerializer.new(candies, options).serialized_json
    end

    def show
        candy = Candy.find_by(slug: params[:slug])
        render json: CandySerializer.new(candy, options).serialized_json
    end

    def create
        candy = Candy.new(candy_params)

        if candy.save
            render json: CandySerializer.new(candy).serialized_json
        else
            render json: { error: candy.errors.messages }, status: 422
        end
    end

    def update
        candy = Candy.find_by(slug: params[:slug])

        if candy.update(candy_params)
            render json: CandySerializer.new(candy, options).serialized_json
        else
            render json: { error: candy.errors.messages }, status: 422
        end
    end

    def destroy
        candy = Candy.find_by(slug: params[:slug])

        if candy.destroy
            head :no_content
        else
            render json: { error: candy.errors.messages }, status: 422
        end
    end

    private

    def candy_params
        params.require(:candy).permit(:name, :about, :image_url)
    end

    def options
        @options ||= { include: %i[reviews] }   # add assosieted reviews
    end
end