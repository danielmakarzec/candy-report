require 'rails_helper'

RSpec.describe Candy, type: :model do
  let(:candy) { Candy.create!(name: "Candy Name", image_url: '/image_path')}

  it "is valid with valid attributes" do
    expect(candy).to be_valid
  end
  it "is not valid without a name" do
    candy.name = nil
    expect(candy).to_not be_valid
  end
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
      expect(candy.slug).to eq('candy-name')
    end
  end
end
