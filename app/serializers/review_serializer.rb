class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :arline_id
end
