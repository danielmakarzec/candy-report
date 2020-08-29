class AddAboutToCandy < ActiveRecord::Migration[6.0]
  def change
    add_column :candies, :about, :string
  end
end
