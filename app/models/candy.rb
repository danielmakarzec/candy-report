class Candy < ApplicationRecord
    has_many :reviews

    validates_presence_of :name
    validates_presence_of :image_url

    before_create :slugify

    def slugify
        self.slug = name.parameterize
    end


end
