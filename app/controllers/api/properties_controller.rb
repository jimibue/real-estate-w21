class Api::PropertiesController < ApplicationController

   before_action :set_page, only: [:city]

    def index
      render json: Property.available
    end
    
    def get_cities
      render json: Address.get_cities
    end

    def city
      puts '==============='
      puts '==============='
      puts '==============='
      puts params
      puts '==============='
      puts '==============='
      puts '==============='
      # .page is something that kaminari gives us
      properties = Property.page(@page).by_city(params[:city])
      # .total_pages is something that kaminari gives us
      total_pages = properties.total_pages
      render json: {properties: properties, total_pages: total_pages}
    end

    private
    def set_page
     # short circuit evulation 
     @page = params[:page] || 1

     # terniary
     # @page = params[:page] ?  params[:page] :  1

     # if else
      #  if(params[:page])
      #    @page = params[:page]
      #  else 
      #    @page = 1 
      #  end
    end

end
