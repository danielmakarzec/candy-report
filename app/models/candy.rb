class Candy < ApplicationRecord
    has_many :reviews, dependent: :destroy

    validates_presence_of :name
    validates_presence_of :image_url
    validates :name, uniqueness: { case_sensitive: false }

    before_create :slugify
    before_update :slugify

    def slugify
        self.slug = name.parameterize if self.name
    end

    def avg_score
        reviews.average(:score).round(2).to_f
    end

end
