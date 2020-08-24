require 'rails_helper'

RSpec.describe Review, type: :model do
  let(:candy) { Candy.create!(id: 1, name: 'name', image_url: '/path', slug: 'name') }  
  
  subject {
    described_class.new(title: "Candy Title",
                        description: "candy description",
                        score: 1,
                        )
  }
  
  it "is valid with valid attributes" do
    subject.candy_id = candy.id
    expect(subject).to be_valid
  end
  it "is not valid without a title" do
    subject.title = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a description" do
    subject.description = nil
    expect(subject).to_not be_valid
  end
  it "is not valid without a score" do
    subject.score = nil
    expect(subject).to_not be_valid
  end

  # associations
  describe "Associations" do
    it { should belong_to(:candy).without_validating_presence }
  end
end
