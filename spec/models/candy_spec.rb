require 'rails_helper'

RSpec.describe Candy, type: :model do
  let(:candy) { Candy.create!(id: 1, name: "Candy Name", image_url: '/image_path')}

  # validation
  it "is valid with valid attributes" do
    expect(candy).to be_valid
  end
  it "is not valid without a name" do
    candy.name = nil
    expect(candy).to_not be_valid
  end
  it { should validate_uniqueness_of(:name).case_insensitive }

  it "is not valid without a image_url" do
    candy.image_url = nil
    expect(candy).to_not be_valid
  end

  # associations
  describe "Associations" do
    it { should have_many(:reviews).without_validating_presence }
  end

  # methods
  describe "#slugify" do
    it "should return serialized slug based on the name on a candy" do
      expect(candy.slug).to eq 'candy-name'
    end
  end

  describe "#avg_score" do
    it 'returns average value of all scores' do
      candy
      Review.create!(candy_id: 1, title: 'title', description: 'description', score: 1)
      Review.create!(candy_id: 1, title: 'title', description: 'description', score: 5)
      expect(candy.avg_score).to eq 3.0
    end
    it 'returns 0 when there are no reviews' do
      candy
      expect(candy.avg_score).to eq 0
    end
    it 'returns 0 when there are some reviews but no ratings' do
      candy
      Review.create!(candy_id: 1, title: 'title', description: 'description', score: nil)
      expect(candy.avg_score).to eq 0
    end
  end
end
