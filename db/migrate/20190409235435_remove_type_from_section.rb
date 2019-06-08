class RemoveTypeFromSection < ActiveRecord::Migration[5.1]
  def change
    remove_column :sections, :type, :string
  end
end
