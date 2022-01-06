class Address < ApplicationRecord
  belongs_to :property
  # SELECT DISTINCT city 
  # FROM addresses;
  def self.get_cities
   cities =  select('DISTINCT city')

  cities.map do |city|
    city.city
   end
  end
end
