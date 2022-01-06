class Api::PropertiesController < ApplicationController

    def index
      render json: Property.available
    end
    
    def get_cities
      render json: Address.get_cities
    end

    def city
      render json: Property.by_city(params[:city])
    end

end
