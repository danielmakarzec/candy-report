class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :candy_id
end
