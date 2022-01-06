class Buyer < ApplicationRecord
  belongs_to :agent
  serialize :cities, Array 

#   SELECT price, sq_ft, city, buyers.id, buyers.first_name, cities, max_price, a.first_name as agent_first_name
# FROM buyers
# INNER JOIN agents AS a ON a.id = buyers.agent_id
# INNER JOIN properties AS p ON p.agent_id = a.id AND p.price < buyers.max_price
# INNER JOIN addresses AS ad ON ad.property_id = p.id AND city = ANY('{"SLC","Sandy"}')
# WHERE buyers.id = 1 and sold <> true;

  def self.my_homes(id, cities)
    select('price, sq_ft, city, buyers.id, buyers.first_name, cities, max_price, a.first_name as agent_first_name')
    .joins("INNER JOIN agents AS a ON a.id = buyers.agent_id
    INNER JOIN properties AS p ON p.agent_id = a.id AND p.price < buyers.max_price
    INNER JOIN addresses AS ad ON ad.property_id = p.id AND city = ANY('{#{cities.join(',')}}')")
    .where('buyers.id = ? and sold <> true', id)
  end
end
